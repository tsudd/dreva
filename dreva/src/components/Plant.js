import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { HOVERED_TREE_SELECTOR } from "../constants/labels";
import { PageLayout } from "../layout/PageLayout";
import { Field } from "../modules/field";
import { RecordsHistory } from "../modules/history";
import { useDreva } from "../providers/DrevaProvider";
import { Forest } from "./components/Forest";
import { History } from "./components/History";
import { Tools } from "./components/Tools";

export const Plant = (props) => {
    const { userAuth, storage, setUser, user } = useDreva()
    const [forest, setForest] = useState(null)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        setForest(new Field(document.querySelector('#field')))
        setHistory(new RecordsHistory(document.querySelector('#history'), document.querySelector('#total-time')))
        onAuthStateChanged(userAuth.auth, async (user) => {
            setUser(user)
        })
    }, [userAuth.auth])

    useEffect(() => {
        const getTodayTrees = async () => {
            if (!history || !forest || !user) return
            let todayRecords = await storage.getTodayTrees(user)
            let recordElements = history.generateRecordElementsAndSave(todayRecords)
            for (let i = 0; i < todayRecords.length; i++) {
                let tree = forest.plantTree(todayRecords[i].place, todayRecords[i].tree)
                // tree.addEventListener('dragstart', dragStart)
                // tree.addEventListener('dragend', dragEnd)

                recordElements[i].addEventListener('mouseover', (e) => handleRecordPoint(tree))
                recordElements[i].addEventListener('mouseleave', (e) => handleRecordLeave(tree))
            }
        }
        getTodayTrees()
    }, [forest, history, user, storage])

    const handleRecordPoint = (tree) => {
        tree.classList.add(HOVERED_TREE_SELECTOR)
    }

    const handleRecordLeave = (tree) => {
        tree.classList.remove(HOVERED_TREE_SELECTOR)
    }

    const treeHasGrowen = async (args) => {
        let tree = forest.setGrowenTree(args.tree)
        let record = history.addHistory(args.time, forest.selectedTree, args.tree)

        // tree.addEventListener('dragstart', dragStart)
        // tree.addEventListener('dragend', dragEnd)
        if (args.tree > 0) {
            record.addEventListener('mouseover', (args) => handleRecordPoint(tree))
            record.addEventListener('mouseleave', (args) => handleRecordLeave(tree))
        }
        if (userAuth.getUser() !== null) {
            let treeId = await storage.postTree(userAuth.getUser(), history.records[history.records.length - 1])
            history.records[history.records.length - 1].id = treeId
        }
        // toggleMode()
        alert("Tree has growen!")
    }

    return (
        <PageLayout>
            <main className="content">
                <Tools forest={forest} handleGrowenTree={treeHasGrowen} />
                <Forest />
                <History />
            </main>
            )
        </PageLayout>
    )
}