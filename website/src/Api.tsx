import React, { useRef, useEffect } from 'react';
import { Animate } from 'react-simple-animate';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import colors from './styles/colors';
import { SubHeading, HeadingWithTopMargin, Title } from './styles/typography';
import { setHomePage } from './ButtonGroup';

const code = `import React from 'react'
import useForm from 'react-forme // import react-form

function YourForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {} // your form submit function which will invoke after validation
  
  return (
    <form onsubmit={handleSubmit(onSubmit)}> // handleSubmit will validation your inputs before onSubmit
      // you will have to register your input into react-forme, by invoke the register function with ref as the argument      
      <input type="text" name="example" ref={ ref => { register({ ref })} } />
      <input type="submit" /> 
    </form>
  )
}
`;

const errorCode = `import React from 'react'
import useForm from 'react-forme

function YourForm() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {};
  
  return (
    <form onsubmit={handleSubmit(onSubmit)}>
      <input type="text" name="textInput" ref={ ref => { register({ ref, required, maxLength: 50 })} } />
      {errors.textInput && errors.textInput.required && 'Your input is required'}
      {errors.textInput && errors.textInput.maxLength && 'Your input exceed maxLength'}
      <input type="number" name="numberInput" ref={ ref => { register({ ref, min: 50 })} } />
      {errors.numberInput && errors.numberInput.min && 'Your input required to be more than 50'}
      <input type="submit" /> 
    </form>
  )
}
`;

const Root = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0e101c;
  z-index: 4;
  color: white;
  padding: 0 20px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  
  & hr {
    border: none;
    border-top: 1px solid ${colors.lightBlue}
    margin: 40px 0;
    display: block;
  }

  & pre,
  & code {
    font-size: 14px;
    text-align: left;
    color: white;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    background: none !important;
  }
`;

const Table = styled.table`
  td {
    vertical-align: top;
    padding: 10px 20px 10px 0;

    & > pre {
      margin: 0;
    }
  }
`;

const TableWrapper = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Type = styled.span`
  font-weight: 100;
  font-size: 16px;
  color: ${colors.lightPink};
`;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  overflow: hidden;
`;

const CloseButton = styled.button`
  font-size: 30px;
  top: 0;
  right: 0;
  padding: 20px;
  position: absolute;
  cursor: pointer;
  border: none;
  font-weight: 200;
  z-index: 5;
  border-radius: 10px;
  color: white;
  background: rgba(14, 16, 28, 0.5294117647058824);

  @media (min-width: 768px) {
    font-size: 35px;
    padding: 20px;
    top: 15px;
    left: 20px;
  }
`;

function Builder({ formData, updateFormData, showApi, toggleApi, apiButton, isMobile }: any) {
  const copyFormData = useRef([]);
  const closeButton = useRef(null);
  copyFormData.current = formData;

  useEffect(
    () => {
      if (showApi && closeButton.current) {
        // @ts-ignore
        closeButton.current.focus();
      }
    },
    [showApi],
  );

  return (
    <Animate
      play={showApi}
      type="ease-in"
      durationSeconds={isMobile ? 0.3 : 0.5}
      startStyle={{
        transform: 'translateY(100vh)',
      }}
      endStyle={{
        transform: 'translateY(0)',
      }}
      render={({ style }) => {
        return (
          <Root style={style}>
            <div
              style={{
                overflow: 'auto',
                height: '100vh',
                background: colors.primary,
              }}
            >
              <CloseButton
                ref={closeButton}
                tabIndex={0}
                onClick={() => {
                  toggleApi(false);
                  apiButton.current.focus();
                  setHomePage();
                }}
              >
                &#10005;
              </CloseButton>
              <HeadingWithTopMargin>API</HeadingWithTopMargin>
              <SubHeading>React forme focus on providing the best DX by simplify the API.</SubHeading>

              <Wrapper>
                <Title>Quick Start</Title>
                <h2>» Installation</h2>
                <p>Installing react-forme only takes a single command and you're ready to roll.</p>
                <code>npm install react-form</code>

                <h2>» Example</h2>
                <p>The following code will demonstrate the basic usage of react-forme.</p>
                <SyntaxHighlighter style={monokaiSublime}>{code}</SyntaxHighlighter>

                <Title>API</Title>
                <p>
                  React forme use hook behind the scene by invoke <code>useForm</code>, you will receive the following methods.
                </p>

                {/*<ul>*/}
                  {/*<li><code>register</code></li>*/}
                  {/*<li><code>errors</code></li>*/}
                  {/*<li><code>watch</code></li>*/}
                  {/*<li><code>handleSubmit</code></li>*/}
                {/*</ul>*/}

                <code>
                  <h2>
                    »useForm:{' '}
                    <Type
                    >{`({ mode: 'onSubmit' | 'onBlur' | 'onChange' }): { register, errors, handleSubmit, watch }`}</Type>
                  </h2>
                </code>

                <TableWrapper>
                  <Table>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                      <tr>
                        <td>onSubmit</td>
                        <td>
                          <Type>string</Type>
                        </td>
                        <td>
                          This is the default option, validation will trigger on submit and then attach{' '}
                          <code>onchange</code> event to those fields which are invalid.
                        </td>
                      </tr>
                      <tr>
                        <td>onBlur</td>
                        <td>
                          <Type>string</Type>
                        </td>
                        <td>Validation will trigger on each input blur event.</td>
                      </tr>
                      <tr>
                        <td>onChange</td>
                        <td>
                          <Type>string</Type>
                        </td>
                        <td>
                          Not recommended as validation will go through each on change to your input, consider this as a
                          bad performance practice.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </TableWrapper>

                <hr />

                <code>
                  <h2>
                    »register: <Type>(args: Object):void</Type>
                  </h2>
                </code>
                <p>You need to initialize react form hook before you can start register your inputs.</p>
                <p>
                  This is the function to register <code>Ref</code> into <code>react-forme</code> and also includes validation
                  rules. Validation rules are all based on html input validation standard except there one method{' '}
                  <code>custom</code> which allow you to do some custom validations.
                </p>
                <p
                  style={{
                    color: colors.secondary,
                  }}
                >
                  <b>Important:</b> input name is <b>required</b> and <b>unique</b> for react-forme in order to register
                  the input.
                </p>

                <TableWrapper>
                  <Table>
                    <tbody>
                      <tr>
                        <th>name</th>
                        <th>type</th>
                        <th>description</th>
                        <th>example</th>
                      </tr>
                      <tr>
                        <td>
                          <code>ref</code>
                        </td>
                        <td>
                          <code>
                            <Type>HTMLInputElement</Type>
                          </code>
                        </td>
                        <td>React element ref</td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>required</code>
                        </td>
                        <td>
                          <code>
                            <Type>boolean</Type>
                          </code>
                        </td>
                        <td>
                          A Boolean which, if true, indicates that the input must have a value before the form can be
                          submitted
                        </td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref, required: true })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>maxLength</code>
                        </td>
                        <td>
                          <code>
                            <Type>number</Type>
                          </code>
                        </td>
                        <td>The maximum length of the value to accept for this input</td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref, maxLength: 2 })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>minLength</code>
                        </td>
                        <td>
                          <code>
                            <Type>number</Type>
                          </code>
                        </td>
                        <td>The minimum length of the value to accept for this input</td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref, minLength: 1 })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>max</code>
                        </td>
                        <td>
                          <code>
                            <Type>number</Type>
                          </code>
                        </td>
                        <td>The maximum value to accept for this input</td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref, max: 3 })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>min</code>
                        </td>
                        <td>
                          <Type>number</Type>
                        </td>
                        <td>The minimum value to accept for this input</td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref, min: 3 })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>pattern</code>
                        </td>
                        <td>
                          <code>
                            <Type>RegExp</Type>
                          </code>
                        </td>
                        <td>The pattern for the input</td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref, pattern: \[A-Za-z]{3}\ })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>custom</code>
                        </td>
                        <td>
                          <code>
                            <Type>(Object) => Boolean</Type>
                          </code>
                        </td>
                        <td>call back with input value as the argument</td>
                        <td>
                          <SyntaxHighlighter
                            style={monokaiSublime}
                          >{`<input name="test" ref={ref => register({ ref, custom: (value) => value === 'test'  })}`}</SyntaxHighlighter>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </TableWrapper>

                <hr />
                <code>
                  <h2>
                    »errors: <Type>{`{[key: string]: Object}`}</Type>
                  </h2>
                </code>
                <p>Object contain error info about the individual input.</p>
                <SyntaxHighlighter style={monokaiSublime}>{errorCode}</SyntaxHighlighter>

                <hr />
                <code>
                  <h2>
                    »watch: <Type>({`string | Array<string> | undefined`}) => string | number | boolean</Type>
                  </h2>
                </code>
                <p>Watch over input or selection change.</p>
                <TableWrapper>
                  <Table>
                    <tbody>
                      <tr>
                        <th>type</th>
                        <th>description</th>
                        <th>example</th>
                      </tr>
                      <tr>
                        <td>
                          <Type>string</Type>
                        </td>
                        <td>Target on individual input</td>
                        <td>
                          <code>const value = watch('inputName');</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Type>{`Array<string>`}</Type>
                        </td>
                        <td>Watch multiple inputs over the form</td>
                        <td>
                          <code>const values = watch(['inputName1', 'inputName2']);</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Type>undefined</Type>
                        </td>
                        <td>Watch every input fields in the form</td>
                        <td>
                          <code>const values = watch();</code>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </TableWrapper>

                <hr />
                <code>
                  <h2>
                    »handleSubmit: <Type>({`{ [key: string]: string | number | boolean }`}) => void</Type>
                  </h2>
                </code>
                <p
                  style={{
                    marginBottom: 100,
                  }}
                >
                  This function will pass you the form data when validation pass
                </p>
              </Wrapper>
            </div>
          </Root>
        );
      }}
    />
  );
}

export default React.memo(Builder);
