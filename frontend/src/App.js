import React from 'react';
import './App.css';

const ws = new WebSocket('ws://localhost:1235/ws');

const App = ({}) => {
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [notes, setNotes] = React.useState(['hello', 'hello 2']);
  const [note, setNote] = React.useState('');

  const addMessage = (stringMessage) => {
    console.log(stringMessage.data); // incoming from server
    setNotes((notes) => {
      const newNotes = notes.slice(); // copy from item 0
      newNotes.push(stringMessage.data);
      console.log(newNotes);
      return newNotes;
    });
  };

  React.useEffect(() => {
    console.log('asd');
    // do something when component mounts
    ws.addEventListener('message', addMessage);
    return () => ws.removeEventListener('message', addMessage);
  }, []);

  const handleSubmit = () => {
    console.log(note);
    ws.send(note);
    setNote('');
  };

  const deleteFunction = (i) => {
    console.log('Should delete item at index', i);
    // axios call here
  };

  return (
    <div className="App">
      <header className="user-counter">{totalUsers} : Users</header>
      <div>
        <input value={note} onChange={(e) => setNote(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="notes">
        {notes.map((note, i) => (
          <div className="note-item" key={i}>
            <div>{i}</div>
            <div className="note-content">{note}</div>
            <button onClick={() => deleteFunction(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
