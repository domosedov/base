'use client'

import {
  Button,
  Checkbox,
  Dialog,
  DialogTrigger,
  GridList,
  GridListItem,
  Modal,
  ModalOverlay,
} from 'react-aria-components'

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <DialogTrigger>
        <Button className='rounded-sm border px-4 py-1'>Open dialog</Button>
        <Modal>
          {() => {
            return (
              <ModalOverlay className='fixed inset-0 bg-black/50'>
                <Dialog className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg'>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, ex.
                  </div>
                  <div>
                    <Button
                      slot='close'
                      className={'bg-blue-500 p-4 text-white'}
                    >
                      Close
                    </Button>
                    <NestedDialog />
                  </div>
                </Dialog>
              </ModalOverlay>
            )
          }}
        </Modal>
      </DialogTrigger>

      <GridList aria-label='Favorite pokemon' selectionMode='multiple'>
        <GridListItem textValue='Charizard'>
          <Checkbox slot='selection' value='hello'>
            <div className='block size-4 border'>
              <svg viewBox='0 0 18 18' aria-hidden='true'>
                <polyline points='1 9 7 14 15 4' />
              </svg>
            </div>
            Unsubscribe
          </Checkbox>
          Charizard
          <Button aria-label='Info'>ⓘ</Button>
        </GridListItem>
        <GridListItem textValue='Blastoise'>
          <Checkbox slot='selection' />
          Blastoise
          <Button aria-label='Info'>ⓘ</Button>
        </GridListItem>
        <GridListItem textValue='Venusaur'>
          <Checkbox slot='selection' />
          Venusaur
          <Button aria-label='Info'>ⓘ</Button>
        </GridListItem>
        <GridListItem textValue='Pikachu'>
          <Checkbox slot='selection' />
          Pikachu
          <Button aria-label='Info'>ⓘ</Button>
        </GridListItem>
      </GridList>
    </div>
  )
}

function NestedDialog() {
  return (
    <DialogTrigger>
      <Button>Open nested</Button>
      <Modal isDismissable>
        <ModalOverlay className={'fixed inset-0 bg-black/50'}>
          <Dialog className='fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-md bg-red-500 p-4 shadow-lg'>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, ex. !1!
            </div>

            <Button slot='close' className={'bg-blue-500 p-4 text-white'}>
              Close X
            </Button>
          </Dialog>
        </ModalOverlay>
      </Modal>
    </DialogTrigger>
  )
}
