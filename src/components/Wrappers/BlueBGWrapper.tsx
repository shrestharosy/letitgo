interface IBlueBGWrapperProps {
    children: JSX.Element;
}

const BlueBGWrapper = (props: IBlueBGWrapperProps) => {
    return (
        <>
            <div className='shape shape-style-1 bg-gradient-default'>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>
            {props.children}
        </>
    );
};

export default BlueBGWrapper;
