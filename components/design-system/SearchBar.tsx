import { TextField, InputGroup, Kbd } from '@heroui/react';
import { SearchIcon } from '../icons';

export const SearchBar = () => {
  return (
    <TextField
      aria-label='Search'
      type='search'
    >
      <InputGroup>
        <InputGroup.Prefix>
          <SearchIcon className='text-base text-muted pointer-events-none flex-shrink-0' />
        </InputGroup.Prefix>
        <InputGroup.Input
          className='text-sm'
          placeholder='Search...'
        />
        <InputGroup.Suffix>
          <Kbd className='hidden lg:inline-flex'>
            <Kbd.Abbr keyValue='command' />
            <Kbd.Content>Go</Kbd.Content>
          </Kbd>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
};
