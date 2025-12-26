import './App.css'
import Board from './components/boards/Board';


function App() {

  return (
    <>
    <div className='app'>
      <aside className="sidebar">
        <Board />
      </aside>
      <main>
        <div className='board-writing'>
          <h1 className="left-writing">It always seems impossible</h1>
          <h1 className="right-writing">Until it is done</h1>
        </div>
        {/* <CardList /> */}
      </main>
    </div>
    </>
  )
}

export default App
