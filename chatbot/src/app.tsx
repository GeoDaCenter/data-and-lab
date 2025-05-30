import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDraggable,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { MessageModel } from '@openassistant/core';

import { AiChat } from './assistant';

const root = document.getElementById('openassistant-root');

// get the attribute data-geojson
const geojsonUrl = root?.getAttribute('data-geojson');

export function AiChatApp() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [ideas, setIdeas] = useState<{ title: string; description: string }[]>([]);
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Floating Chat Button - only show when modal is closed */}
      {!isOpen && (
        <Button
          className="fixed bottom-10 right-6 z-50 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg hover:shadow-xl transition-shadow"
          radius="full"
          size="lg"
          startContent={<Icon icon="ri:ai-generate-2" width="24" height="24" />}
          onPress={openModal}
        >
          GeoDa AI Assistant
        </Button>
      )}

      {/* Modal containing AiChat */}
      <Modal
        ref={targetRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="5xl"
        classNames={{
          base: 'max-h-[95vh]',
          body: 'p-0',
        }}
        placement="bottom"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                {...moveProps}
                className="flex flex-col gap-1 px-6 py-4"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    icon="ri:ai-generate-2"
                    width="24"
                    height="24"
                    className="text-pink-500"
                  />
                  <span>GeoDa AI Assistant</span>
                </div>
              </ModalHeader>
              <ModalBody className="px-0 pb-0">
                <AiChat 
                  geojsonUrl={geojsonUrl} 
                  messages={messages}
                  setMessages={setMessages}
                  ideas={ideas}
                  setIdeas={setIdeas}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
} 