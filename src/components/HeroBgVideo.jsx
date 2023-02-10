import React from "react"

function HeroBgVideo() {
    return (
      <div className="bg-video">
        <video src={videoBg} className="bg-video__content" autoPlay loop muted />
      </div>
    )
  }

export default HeroBgVideo
