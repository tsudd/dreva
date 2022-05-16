import React from "react";

export const History = (props) => {
    return (
        <section className="history">
            <div className="records-panel">
                <p className="section-head">Last seeds</p>
                <p className="history-total">Total:<span id="total-time" className="history-total-time">0</span></p>
                <ul className="history-records" id="history">
                </ul>
            </div>
        </section>
    )
}