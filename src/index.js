import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import ButtonAppBar from './ButtonAppBar';
import AddButton from './AddButton';
import EhancedTable from './EnhancedTable';


let id = 0;
function createData(name, caneat, notes) {
  id += 1;
  return { id, name, caneat, notes };
}

const data = [
  createData('Frozen yoghurt', 'Yes!', ''),
  createData('Ice cream sandwich', 'No!', 'You trying to kill him?'),
  createData('Eclair', 'Yes!', ''),
  createData('Cupcake', 'Yes!', 'Everyone loves cupcakes.'),
  createData('Gingerbread', 'Yes!', ''),
];

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <ButtonAppBar />
            <EhancedTable items={data}/>
            <AddButton />
        </React.Fragment>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));
  

  