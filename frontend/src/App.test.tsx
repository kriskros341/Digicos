import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import App from "./App"

test("renders component", async () => {
  const { baseElement } = render(<App />)
  expect(baseElement).toBeInTheDocument()
})