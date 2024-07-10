import LeftSide from '@/layouts/LeftSide'
import DAG from '@/layouts/dag/index'
import './index.scss'

function App() {
  return (
    <>
      <div className="left-side">
        <LeftSide></LeftSide>
      </div>
      <div className="dag-wrapper">
        <DAG></DAG>
      </div>
    </>
  )
}

export default App
