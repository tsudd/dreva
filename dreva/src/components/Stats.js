import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PageLayout } from "../layout/PageLayout";
import { useDreva } from "../providers/DrevaProvider";
import { onAuthStateChanged } from "@firebase/auth";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const Stats = (props) => {
    const { storage, userAuth, user } = useDreva()
    const [dataSet, setDataset] = useState({
        labels: [],
        data: []
    })
    const [localAuth, setAuth] = useState(null)

    useEffect(() => {
        onAuthStateChanged(userAuth.auth, async (user) => {
            setAuth(user)
        })
    }, [])

    useEffect(() => {
        if (!localAuth) return
        const todayTotalLabel = document.querySelector(".today")
        const weekTotalLabel = document.querySelector(".week")
        const monthTotalLabel = document.querySelector(".month")

        const renderMonthChart = (records) => {
            let minutesPerDay = []
            let dates = []

            for (let i = 0, date = new Date(); i < 30; i++, date.setDate(date.getDate() - 1)) {
                minutesPerDay.push(0)
                dates.push((date.getDate() < 10 ? '0' : '') + date.getDate() + '/' + (date.getMonth() + 1).toString())
            }
            dates = dates.reverse()

            let day = new Date()
            day.setUTCHours(0, 0, 0, 0)
            for (let i = records.length - 1, j = dates.length - 1; i >= 0 && j >= 0;) {
                if (records[i].time >= day) {
                    minutesPerDay[j] += parseInt(records[i].long)
                    i--
                } else {
                    day.setDate(day.getDate() - 1)
                    j--
                }
            }
            setDataset({
                labels: dates,
                data: minutesPerDay
            }
            )
        }

        const render = async (user) => {
            let todayTotal = 0
            let weekTotal = 0
            let monthTotal = 0
            let records = await storage.getMonthTrees(user)

            let day = new Date()
            day.setUTCHours(0, 0, 0, 0)
            let week = new Date()
            week.setDate(week.getDate() - 7)
            week.setUTCHours(0, 0, 0, 0)

            records.forEach(record => {
                if (record.time >= day) todayTotal += record.long
                if (record.time >= week) weekTotal += record.long
                monthTotal += record.long
            })
            renderMonthChart(records)

            todayTotalLabel.innerHTML = todayTotal.toString()
            weekTotalLabel.innerHTML = weekTotal.toString()
            monthTotalLabel.innerHTML = monthTotal.toString()
        }
        render(localAuth)
    }, [localAuth])

    const data = {
        labels: dataSet.labels,
        datasets: [
            {
                label: 'Minutes per day',
                data: dataSet.data,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <PageLayout>
            {localAuth ? <main className="stats">
                <div className="totals">
                    <p className="stats_header">Total time focused</p>
                    <p>Today: <span className="total-num today">0</span> minutes</p>
                    <p>Last week: <span className="total-num week">0</span> minutes</p>
                    <p>Last month: <span className="total-num month">0</span> minutes</p>
                </div>
                <div className="month-chart">
                    <Bar data={data} />
                </div>
            </main>
                :
                <div>Log in to see your data</div>}

        </PageLayout>
    )
}