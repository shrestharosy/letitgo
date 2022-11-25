import { Button, Modal } from 'reactstrap';

interface IDeleteModalProps {
    isOpen: boolean;
    onClick: () => void;
    onClose: () => void;
}

const DeleteModal = (props: IDeleteModalProps) => {
    const { isOpen, onClick, onClose } = props;
    return (
        <>
            <Modal
                className='modal-dialog-centered'
                isOpen={isOpen}
                toggle={() => onClose()}
            >
                <div className='modal-body mt-4'>
                    <div>
                        <span className='text-base'>
                            Are you sure you want to delete the item ?
                        </span>
                    </div>
                </div>
                <div className='modal-footer'>
                    <Button
                        color='danger'
                        type='button'
                        onClick={() => onClick()}
                    >
                        Yes
                    </Button>
                    <Button
                        color='link'
                        data-dismiss='modal'
                        type='button'
                        onClick={() => onClose()}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default DeleteModal;
