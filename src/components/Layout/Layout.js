import React from 'react';
import classes from './Layout.module.scss';

const Layout = props => {

    return (
        <>
            <div>ToolBar, SideDrawer, BackDrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    );
}

export default Layout;