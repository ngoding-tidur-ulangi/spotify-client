import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode, useState } from 'react'

type DropDownProps = {
  trigger: ReactNode
  options: ReactNode[]
  className?: string
}

function DropDown({ trigger, options, className }: DropDownProps) {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger
        asChild
        className={`${open && 'border-2'} border-slate-900`}
      >
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${className} bg-neutral-700 p-1.5 rounded-sm text-white`}
        >
          {options.length == 0 ? (
            <DropdownMenu.Item className="py-1 outline-none cursor-default">
              No Option
            </DropdownMenu.Item>
          ) : (
            options.map((e, i) => (
              <DropdownMenu.Item className="outline-none" key={i}>
                {e}
              </DropdownMenu.Item>
            ))
          )}
          <DropdownMenu.Arrow className="fill-none" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropDown
