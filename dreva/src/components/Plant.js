import React, { useEffect, useState } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Field } from "../modules/field";
import { RecordsHistory } from "../modules/history";
import { Forest } from "./components/Forest";
import { History } from "./components/History";
import { Tools } from "./components/Tools";

export const Plant = (props) => {
    const [forest, setForest] = useState(null)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        setForest(new Field(document.querySelector('#field')))
        setHistory(new RecordsHistory(document.querySelector('#history'), document.querySelector('#total-time')))
    }, [])

    const treeHasGrowen = (args) => {
        let tree = forest.setGrowenTree(args.tree)
        let record = history.addHistory(args.time, forest.selectedTree, args.tree)

        // tree.addEventListener('dragstart', dragStart)
        // tree.addEventListener('dragend', dragEnd)
        // if (ee.detail.tree > 0) {
        //     record.addEventListener('mouseover', (e) => handleRecordPoint(tree))
        //     record.addEventListener('mouseleave', (e) => handleRecordLeave(tree))
        // }
        // if (userAuth.getUser() !== null) {
        //     let treeId = await storage.postTree(userAuth.getUser(), history.records[history.records.length - 1])
        //     history.records[history.records.length - 1].id = treeId
        // }
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