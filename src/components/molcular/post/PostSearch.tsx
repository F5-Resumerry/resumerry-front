import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { openState } from 'recoil/openState';
import Search from '../list/Search';

export default function PostSearch(): JSX.Element {
  const [open, setOpen] = useRecoilState(openState);

  const onClick = useCallback(() => {
    setOpen({ ...open, postFilterOpen: true });
  }, []);

  return <Search onClick={onClick} />;
}
