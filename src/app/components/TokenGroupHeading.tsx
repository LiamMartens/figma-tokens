import React from 'react';
import { useSelector } from 'react-redux';
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
} from './ContextMenu';
import Heading from './Heading';
import useManageTokens from '../store/useManageTokens';
import { editProhibitedSelector } from '@/selectors';

type Props = {
  id: string
  label: string
  path: string
};

export default function TokenGroupHeading({ label, path, id }: Props) {
  const editProhibited = useSelector(editProhibitedSelector);
  const { deleteGroup } = useManageTokens();

  return (
    <ContextMenu>
      <ContextMenuTrigger id={`group-heading-${path}-${label}-${id}`}>
        <Heading size="small">{label}</Heading>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem disabled={editProhibited} onSelect={() => deleteGroup(path)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
