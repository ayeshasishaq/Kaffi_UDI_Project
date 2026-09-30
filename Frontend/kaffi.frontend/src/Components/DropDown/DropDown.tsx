import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../DropDown/DropDown.css';
import type { Country } from '../../Types/Coutry';

type DropDownProps = {
    items: Country[];
    onSelect?: (country: Country) => void;
};

function DropDown({ items, onSelect }: DropDownProps) {
    return (
        <DropdownButton id="country-dropdown" title="Velg land" className="my-dropdown">
            {items.map((country) => (
                <Dropdown.Item key={country.id} onClick={() => onSelect?.(country)}>
                    {country.name}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

export default DropDown;