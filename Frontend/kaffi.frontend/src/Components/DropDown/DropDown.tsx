import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../DropDown/DropDown.css';

type Option = {
    //name: string;
    id: number;
}

type DropDownProps<T extends {id: number} >= {
    items: T[];
    selected: T | null;
    placeholder: string;
    onSelect: (item: T) => void;
    getLabel: (item: T) => string;
};

function DropDown<T extends {id: number}> ({
    items, 
    selected, 
    placeholder, 
    onSelect,
    getLabel,
}: DropDownProps<T> ){
    return (
        <DropdownButton 
        id={`dropdown-${placeholder}`}
        title={selected ? getLabel(selected) : placeholder} 
        className="my-dropdown">
            {items.map((item) => (
                <Dropdown.Item key={item.id} onClick={() => onSelect(item)}>
                    {getLabel(item)}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

export default DropDown;