import { Link } from 'react-router-dom';

import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

interface IMenuListItemProps {
  target?: string;
  label: string;
}

const MenuListItem: FC<IMenuListItemProps> = ({ target, label }) => {
  return (
    <MenuItem>
      <Link to={target} className="menuItem">
        <ListItemText>{label}</ListItemText>
      </Link>
    </MenuItem>
  );
};

export default MenuListItem;
