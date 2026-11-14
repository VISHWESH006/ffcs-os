import { useApp } from '../context/contextStore'
import { DEMO_CONFIG } from '../data/demoData'

export function VtopHeader() {
  const { state } = useApp()
  return <header className="vtop-header">
    <div className="vtop-header-inner">
      <div className="vtop-logo-area"><div className="vtop-logo-name"><span className="vtop-logo-vit">VIT Bhopal</span><br /><span className="vtop-logo-bhopal">UNIVERSITY</span></div></div>
      <div className="vtop-header-title"><div className="vtop-title-main">VTOP</div><div className="vtop-title-session">{DEMO_CONFIG.sessionHeading}</div></div>
    </div>
    {state.session.loggedIn && <div className="vtop-sub-header"><span className="vtop-student-info">{state.session.demoRegisterNumber} - {state.session.studentName} - {state.session.programme} - {state.session.branch} - {state.session.degree}</span><span className="vtop-datetime">18-Jul-2024 17:50:42</span></div>}
  </header>
}
