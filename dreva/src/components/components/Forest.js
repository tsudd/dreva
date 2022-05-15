import React, { useEffect } from "react";
import { Field } from "../../modules/field";

export const Forest = (props) => {

    // const dragStart = (e) => {
    //     e.dataTransfer.setData('text/plain', e.target.id)
    //     e.dataTransfer.setData('text/html', e.target.outerHTML)
    //     setTimeout(() => {
    //         e.target.classList.add('hide');
    //     }, 0);
    // }

    // const dragEnd = (e) => {
    //     e.target.classList.remove('hide')
    // }

    // const dragEnter = (e) => {
    //     e.preventDefault();
    //     e.target.classList.add('drag-over');
    // }

    // const dragOver = (e) => {
    //     e.preventDefault();
    //     e.target.classList.add('drag-over');
    // }

    // const dragLeave = (e) => {
    //     e.target.classList.remove('drag-over');
    // }

    // const drop = async (e, el) => {
    //     e.preventDefault()
    //     e.target.classList.remove('drag-over')
    //     const id = e.dataTransfer.getData('text/plain')
    //     const draggable = document.getElementById(id)
    //     const initialPlace = draggable.parentNode
    //     const targetChild = el.firstElementChild
    //     el.innerHTML = ''
    //     el.appendChild(draggable)
    //     initialPlace.appendChild(targetChild)
    //     // if (userAuth.getUser() !== null) {
    //     //     let newPlace = Array.prototype.indexOf.call(document.getElementById("field").children, el)
    //     //     let draggedRecord = history.getRecordByPlace(Array.prototype.indexOf.call(document.getElementById("field").children, initialPlace))
    //     //     if (draggedRecord === null) return
    //     //     await storage.updateTreePlace(userAuth.getUser(), draggedRecord, newPlace)
    //     //     history.updateRecordPlace(draggedRecord, newPlace)
    //     // }
    // }

    // useEffect(() => {
    //     const boxes = document.querySelectorAll('.box')
    //     boxes.forEach(box => {
    //         box.addEventListener('dragenter', dragEnter)
    //         box.addEventListener('dragover', dragOver);
    //         box.addEventListener('dragleave', dragLeave);
    //         box.addEventListener('drop', async (e) => await drop(e, box))
    //     })
    // }, [])



    return (
        <section className="forest">
            <div className="field" id="field">
                <div className="box">
                    <div id="place0" className="tree oak" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place1" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place2" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place3" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place4" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place5" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place6" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place7" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place8" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place9" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place10" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place11" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place12" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place13" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place14" className="empty" draggable="true"></div>
                </div>
                <div className="box">
                    <div id="place15" className="empty" draggable="true"></div>
                </div>
            </div>
        </section >
    )
}