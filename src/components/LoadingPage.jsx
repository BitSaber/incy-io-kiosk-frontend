import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
    body: {
        maxHeight: '3000px',
        backgroundColor: '#0078CC',
        display: 'block',
        height: '120vh',
    },
};

class LoadingPage extends React.Component {

    render() {
        return (
            <div style={style.body}>
                <CircularProgress />
            </div>
        );
    }

}

export default LoadingPage;
