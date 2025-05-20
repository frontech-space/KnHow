import { ReactElement } from 'react'
import { render as rtlRender } from '@testing-library/react'

// カスタムレンダー関数
function render(ui: ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <>{children}</>,
    ...options,
  })
}

// testing-libraryのその他のユーティリティをre-export
export * from '@testing-library/react'
export { render } 