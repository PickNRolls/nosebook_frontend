'use client';

import { AddButton } from './add-button';
import { RemoveButton } from './remove-button';
import { CancelButton } from './cancel-button';
import { ResponderButtons } from './responder-buttons';
import { useRouter } from 'next/navigation';

export type FriendshipClientProps = {
  isFriend: boolean;
  isRequester: boolean;
  isResponder: boolean;
  isNobody: boolean;

  onSend: () => Promise<boolean>;
  onAccept: () => Promise<boolean>;
  onDeny: () => Promise<boolean>;
  onRemove: () => Promise<boolean>;
};

export const FriendshipClient: React.FC<FriendshipClientProps> = (props) => {
  const router = useRouter();
  const { isResponder, isNobody, onSend, onAccept, onDeny, onRemove } = props;

  return (
    <div>
      {isNobody && (
        <AddButton onClick={onSend} />
      )}

      {props.isRequester && (
        <>
          <ResponderButtons
            onAccept={async () => {
              const ok = await onAccept();
              router.refresh();
              return ok;
            }}
            onDeny={async () => {
              const ok = await onDeny();
              router.refresh();
              return ok;
            }}
          />
        </>
      )}

      {isResponder && (
        <CancelButton onClick={() => Promise.resolve(true)} />
      )}

      {props.isFriend && (
        <RemoveButton
          onClick={async () => {
            const ok = await onRemove();
            router.refresh();
            return ok;
          }}
        />
      )}
    </div>
  )
};
