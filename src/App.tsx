import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

function App() {

  console.log('page rendering')

  // use useState to keep track of current name
  const [name, setName] = useState('')
  const handleNameInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const name = nameInput.current?.value
    if(!name) return
    nameInput.current.value = ''
    setName(name)
  }

  /* EXAMPLE 1 */
  /* useRef keeps a value between renders */

  // use useRef to keep track of previous name
  // useState will only remember the current value after rerendering
  // useRef will keep the stored previous value between renders
  const prevName = useRef('')
  // useRef returns an object with a single property
  // {current: ''}
  // and that is what stored in the variable prevName
  // use useEffect to store the previous name whenever name is changed
  useEffect(() => {
      prevName.current = name
  }, [name])


  /* EXAMPLE 2 */
  /* useRef doesn't goes the page to rerender when */
  /* the value of its object's current property changes */
  // use useRef to store rendercount
  // could not use useState for this, as it would cause an infinite render loop
  // we update count at every render which would cause a new render that woudl cause a new update...
  const renderCount = useRef(1)
  // use useEffect to increase render counts every time the pages renders
  // the second parameter of useEffect is used to trigger the function in the first parameter
  // whenever the second parameter's value changes the function in the first parameter runs
  // as we left the second parameter empty our function will run every time the page renders
  // ---> renderCount jumps from 1 to 3 at the first name change 
  // ---> in development if react strict mode is on, final build works fine
  useEffect(() => {
    console.log('counting page render')
    renderCount.current = renderCount.current + 1
  })


  /* EXAMPLE 3 */
  /* reference HTML elements on the page with useReg */
  // use useRef to reference the name input field
  // use type and null
  const nameInput = useRef<HTMLInputElement>(null)
  

  // use nameInput reference to focus on it when button clicked
  const focus = () => {
    nameInput.current?.focus()
  }

  return (
  <Container>
    <h1>Examples of using the useRef React Hook</h1>
    <StyledSection>
      <h2>1. Using useRef to keep track of the previous name</h2>
      <Label htmlFor="name">Name:</Label>
      {/* set ref to nameInput on input element */}
      <Input type="text" ref={nameInput} />
      <button type="submit" onClick={(event) => handleNameInput(event)}>Submit</button>
      <div>Your current name is <Name>{name}</Name> but you used to be called <PrevName>{prevName.current}</PrevName>.</div>
    </StyledSection>
    <StyledSection>
      <h2>2. Using useRef to reference the name input box</h2>
      <button onClick={()=>focus()}>Click me to focus on name field</button>
    </StyledSection>
    <StyledSection>
      <h2>3. Using useRef to count the number of times the page rendered</h2>
      <div>This page was rendered {renderCount.current} times.</div>
    </StyledSection>

  </Container>
  )
}


// STYLED ELEMENTS

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
`
const StyledSection = styled.section`
  margin: 30px auto;
`
const Name = styled.div`
  display: inline-block;
  min-width: 20px;
  min-height: 5px;
  background-color: #6a8ebc;
  color: white; 
  padding: 0.1rem 0.2rem;
`
// PrevName inherits styles of Name and overwrites background-color
const PrevName = styled(Name)`
  background-color: #13a313
`
const Label = styled.label`
  margin-right: 10px;
`
const Input = styled.input`
  margin-right: 10px;
`

export default App