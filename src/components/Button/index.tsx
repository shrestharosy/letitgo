import { Button, UncontrolledTooltip } from 'reactstrap';

interface IActionButtonProps {
    label: string;
    icon: string;
    onClick: () => void;
    color?: string;
}

const ActionButton = (props: IActionButtonProps) => {
    const { label, color = 'primary', icon, onClick } = props;
    return (
        <>
            <Button
                color={color}
                size='sm'
                type='button'
                outline
                style={{ textTransform: 'none' }}
                data-placement='top'
                id={label}
                onClick={(e) => {
                    console.log(e.stopPropagation());
                    onClick();
                }}
            >
                <i className={icon} />
            </Button>
            <UncontrolledTooltip delay={0} placement='top' target={label}>
                {label}
            </UncontrolledTooltip>
        </>
    );
};

export default ActionButton;
