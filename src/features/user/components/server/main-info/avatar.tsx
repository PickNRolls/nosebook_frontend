'use client';

import { FC, useRef, useState } from 'react';

import * as featuser from '@/features/user/client';
import * as featmodal from '@/features/modal/client';
import * as featcurrentuser from '@/features/current-user';

import { Modal } from '@/components/modal';
import { Button } from '@/components/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type AvatarProps = {
  user: featuser.Model;
  currentUser: featcurrentuser.Model;
  onUpdate: (formData: FormData) => Promise<void>;
}

const symbolUpdate = Symbol('update-modal');

type ModalUpdateProps = {
  imageSrc: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ModalUpdate = (props: featmodal.Props & ModalUpdateProps) => {
  return (
    <Modal visible={props.visible} header="Фотография на вашей странице" onClose={props.onClose}>
      <div className="flex flex-col items-center gap-5">
        <Image src={props.imageSrc} width={600} height={600} alt="uploaded avatar" />
        <div className="flex gap-2">
          <Button view="primary" height="md" width="auto" onClick={props.onConfirm}>Сохранить и продолжить</Button>
          <Button view="light" height="md" width="auto" onClick={props.onCancel}>Вернуться назад</Button>
        </div>
      </div>
    </Modal>
  )
};

export const Avatar: FC<AvatarProps> = (props) => {
  const { currentUser, user, onUpdate } = props;

  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [modalUpdate] = useState(() => featmodal.service().handler(symbolUpdate, ModalUpdate));

  return (
    <>
      <featuser.components.Avatar
        onlineMarkerClassName="right-[11.5px] bottom-[12px]"
        className="size-[150px]"
        outline
        user={user}
        canShowLastOnlineMarker
      />
      {currentUser.id === user.id && (
        <>
          <input className="hidden" type="file" accept="image/png,image/jpeg" ref={ref} onChange={e => {
            const files = e.target.files;
            if (files == null) {
              return;
            }

            const formData = new FormData();
            const img = files[0];
            formData.set('file', img);

            modalUpdate.open({
              imageSrc: URL.createObjectURL(img),
              onConfirm: async () => {
                await onUpdate(formData);
                modalUpdate.close();
                router.refresh();
              },
              onCancel: modalUpdate.close,
            });
          }} />
          <featuser.components.AvatarOptions
            className="absolute left-0 top-0 !size-[150px] rounded-t-full"
            onUpdate={() => ref.current?.click()}
          />
        </>
      )}
    </>
  )
};

