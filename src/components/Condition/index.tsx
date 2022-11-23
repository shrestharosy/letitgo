import { Progress } from 'reactstrap';
import {
    getProductConditionColor,
    mapProductCondition,
} from 'src/libs/utils/product.util';

interface IConditionProps {
    condition: number;
    width?: number;
}

const Condition = (props: IConditionProps) => {
    const { condition, width = '40' } = props;

    return (
        <div className='progress-wrapper' style={{ width: `${width}%` }}>
            <div className='progress-info'>
                <div className='text-left'>
                    <div
                        className='font-normal text-muted'
                        style={{ fontSize: '80%' }}
                    >
                        {mapProductCondition(condition)}
                    </div>
                </div>
            </div>
            <Progress
                max='5'
                value={condition}
                color={getProductConditionColor(condition)}
            />
        </div>
    );
};

export default Condition;
