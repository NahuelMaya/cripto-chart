/**
 * @jest-environment jsdom
 */
import {render, screen, waitForElementToBeRemoved} from '../../utils/wrapers'
import userEvent from '@testing-library/user-event';
import Home from "../../pages/index";
import {server} from '../../utils/tests/server'
import {rest} from 'msw'

global.ResizeObserver = require('resize-observer-polyfill')

describe("Home test", () => {
  test('Should match snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("On currencies request success, currencies should be shown", async () => {
      render(<Home />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument()
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
      expect(screen.getByText(/xrp:/i)).toBeInTheDocument()
    });

    test('Component error should show if currencies request fails', async () => {
      server.use(
        rest.get(
          'http://api.exchangeratesapi.io/v1/latest?access_key=${key}&format=1',
          async (req, res, ctx) => {
            return res(ctx.status(500))
          },
        ),
      )
      render(<Home />)
      expect(screen.getByText(/loading/i)).toBeInTheDocument()
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
      expect(screen.getByText(/Error/i)).toBeInTheDocument()
    })
    
    test("On currency click, chart should be shown", async () => {
      render(<Home />);
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
      userEvent.click(screen.getByText(/xrp:/i))
      expect(screen.getByText(/loading/i)).toBeInTheDocument()
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
      expect(screen.getByRole('img')).toBeInTheDocument()
  });
});