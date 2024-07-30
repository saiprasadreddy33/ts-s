import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { getInitials } from "../utils";

const UserInfo = ({ user, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    onUpdate({ name, title, email });
    setEditMode(false);
  };

  return (
    <div className='px-4'>
      <Popover className='relative'>
        <>
          <Popover.Button className='group inline-flex items-center outline-none'>
            <span>{getInitials(user?.name)}</span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0'>
              <div className='flex flex-col gap-4 rounded-lg shadow-lg bg-white p-8'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl'>
                    <span className='text-center font-bold'>
                      {getInitials(user?.name)}
                    </span>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    {editMode ? (
                      <>
                        <input
                          type='text'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className='text-black text-xl font-bold border-b border-gray-300 focus:outline-none'
                        />
                        <input
                          type='text'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className='text-base text-gray-500 border-b border-gray-300 focus:outline-none'
                        />
                        <input
                          type='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='text-blue-500 border-b border-gray-300 focus:outline-none'
                        />
                        <button
                          onClick={handleSave}
                          className='mt-2 text-blue-500 hover:underline'
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <p className='text-black text-xl font-bold'>{user?.name}</p>
                        <span className='text-base text-gray-500'>{user?.title}</span>
                        <span className='text-blue-500'>{user?.email ?? "email@example.com"}</span>
                        <button
                          onClick={() => setEditMode(true)}
                          className='mt-2 text-blue-500 hover:underline'
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
};

export default UserInfo;
