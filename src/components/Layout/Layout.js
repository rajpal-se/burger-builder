const Layout = props => {

    return (
        <>
            <div>ToolBar, SideDrawer, BackDrop</div>
            <main>
                {props.children}
            </main>
        </>
    );
}

export default Layout;