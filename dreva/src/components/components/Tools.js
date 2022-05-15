import React, { useEffect, useState } from "react";
import { PLANT_BUTTON_LABEL, PLANT_STOP_SELECTOR, STOP_BUTTON_LABEL } from "../../constants/labels";
import { CustomTimer } from "../../modules/timer";

export const Tools = (props) => {
    const [timer, setTimer] = useState({
        time: 25,
        treeGrowingMode: false,
        timer: null
    })

    useEffect(() => {
        setTimer(prevs => ({ ...prevs, timer: new CustomTimer() }))
    }, [])

    const handleTimerChange = (e) => {
        timer.timer.setTimer(e.target.value)
        setTimer(prevs => ({ ...prevs, time: e.target.value }))
    }

    const handlePlantTree = async (e) => {
        if (!timer.treeGrowingMode) {
            let growing = -1
            if (!props.forest.hasFreePlace()) {
                let ans = window.confirm("Forest is full. Continue without planting a new tree?")
                if (!ans) return
            } else {
                growing = props.forest.plantSeed()
            }
            timer.timer.startTimer(growing, async (args) => {
                setTimer(prevs => ({ ...prevs, treeGrowingMode: !prevs.treeGrowingMode, time: timer.timer.timeLong }))
                props.handleGrowenTree(args)
            })
        } else {
            timer.timer.stopTimer()
            props.forest.deleteSeed()
        }
        setTimer(prevs => ({ ...prevs, treeGrowingMode: !timer.treeGrowingMode }))
    }

    return (
        <section className="tools column">
            <div className="timer">
                <p className="timer-head section-head">Timer</p>
                <div className="slider"><input disabled={timer.treeGrowingMode ? true : false} onChange={handleTimerChange} id="timer-slider" type="range" min="1" max="90" value={timer.time} /></div>
                <p className="selected-time" id="timing">{timer.time}</p>
                <div className="timer-btn"><button id="plant-btn" className={`plant-btn ${timer.treeGrowingMode ? PLANT_STOP_SELECTOR : ''}`} onClick={handlePlantTree}>{timer.treeGrowingMode ? STOP_BUTTON_LABEL : PLANT_BUTTON_LABEL}</button></div>
            </div>
            <div className="tree-selector">
                <p className="section-head">Tree selector</p>
                <div className="selector">
                    <div disabled={timer.treeGrowingMode ? true : false} id="next-tree-button" className="next-btn selector_tree-btn"></div>
                    <div id="selected-tree" className="tree oak selector_tree"></div>
                    <div disabled={timer.treeGrowingMode ? true : false} id="prev-tree-button" className="prev-btn selector_tree-btn"></div>
                </div>
            </div>
        </section>
    )
}