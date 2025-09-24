import React from 'react'
import './rightPortion.css'

const RightPanel = () => {
  return (
    <div className="right-panel">
      <div>
        <div className="assistant-info">
          <h3>Hi, I’m your Assistant 🤖</h3>
          <p>I can help you with queries, coding tips, mental health support, and more.  
             Just type your prompt in the chat!</p>
        </div>

        <div className="suggestions">
          <h4>Try asking me:</h4>
          <div className="suggestion">💡 How do I stay productive?</div>
          <div className="suggestion">📘 Explain React useState hook</div>
          <div className="suggestion">🧘 Tips for stress relief</div>
          <div className="suggestion">⚡ Generate a study plan</div>
        </div>
      </div>

      <div className="footer">
        © 2025 Thinkfit AI  
      </div>
    </div>
  )
}

export default RightPanel
