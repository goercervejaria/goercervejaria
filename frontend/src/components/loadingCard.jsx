import React from "react"
import loadingGif from "../images/loading.gif"
import palceholderBeer from "../images/b1.jpg"

function LoadingCard({text}) {
    return (
        <div className="beer-card">
            <div className="image-container" style={{ position: "relative" }}>
                <img
                    className="beer-image-palceholder"
                    src={palceholderBeer}
                    style={{ border: "2px solid #ccc" }}
                />

                <div
                    className="loader-container"
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 10,
                        top: 0,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "rgba(256,256,256,0.5)",
                    }}
                >
                    <img
                        className="loading-spinner"
                        src={loadingGif}
                        width="120px"
                        height="120px"
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    />
                    <div
                        className="lead text-mono text-center"
                        style={{ color: "black" }}
                    >
                        {text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingCard
