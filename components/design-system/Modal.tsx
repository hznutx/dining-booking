import { Modal, Button } from '@heroui/react'

interface IModalPopup {
  trigger: React.ReactNode
  content: React.ReactNode
  footer?: React.ReactNode
  header?: string
  className?: string
}

const ModalPopup: React.FC<IModalPopup> = ({
  trigger,
  header,
  content,
  footer,
  className = 'sm:max-w-sm',
}) => {
  return (
    <Modal>
      {trigger}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={className}>
            <Modal.CloseTrigger />
            {header && (
              <Modal.Header>
                <Modal.Heading>{header}</Modal.Heading>
              </Modal.Header>
            )}
            <Modal.Body>{content}</Modal.Body>
            {footer && <Modal.Footer>{footer}</Modal.Footer>}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default ModalPopup
