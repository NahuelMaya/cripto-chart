import {rest} from 'msw'
import { format, subDays } from 'date-fns'
import { key } from '../../constants/key'


const toDay = new Date();

const handlers = [
  rest.get(
    'http://api.exchangeratesapi.io/v1/latest?access_key=${key}&format=1',
    async (req, res, ctx) => {
      return res(ctx.json({rates: {BTC: 4.058103, XRP: 97.98114, CAKE: 121.613827}}))
    },
  ),
  rest.get(
    `http://api.exchangeratesapi.io/v1/${format(subDays(toDay, 0), 'yyyy-MM-dd')}?access_key=${key}&symbols=XRP&format=1`,
    async (req, res, ctx) => {
      return res(ctx.json({rates: {XRP: 5.058103}}))
    },
  ),
  rest.get(
    `http://api.exchangeratesapi.io/v1/${format(subDays(toDay, 1), 'yyyy-MM-dd')}?access_key=${key}&symbols=XRP&format=1`,
    async (req, res, ctx) => {
      return res(ctx.json({rates: {XRP: 5.058103}}))
    },
  ),
  rest.get(
    `http://api.exchangeratesapi.io/v1/${format(subDays(toDay, 2), 'yyyy-MM-dd')}?access_key=${key}&symbols=XRP&format=1`,
    async (req, res, ctx) => {
      return res(ctx.json({rates: {XRP: 5.058103}}))
    },
  ),
  rest.get(
    `http://api.exchangeratesapi.io/v1/${format(subDays(toDay, 3), 'yyyy-MM-dd')}?access_key=${key}&symbols=XRP&format=1`,
    async (req, res, ctx) => {
      return res(ctx.json({rates: {XRP: 5.058103}}))
    },
  ),
  rest.get(
    `http://api.exchangeratesapi.io/v1/${format(subDays(toDay, 4), 'yyyy-MM-dd')}?access_key=${key}&symbols=XRP&format=1`,
    async (req, res, ctx) => {
      return res(ctx.json({rates: {XRP: 5.058103}}))
    },
  ),
  rest.get(
    `http://api.exchangeratesapi.io/v1/${format(subDays(toDay, 5), 'yyyy-MM-dd')}?access_key=${key}&symbols=XRP&format=1`,
    async (req, res, ctx) => {
      return res(ctx.json({rates: {XRP: 5.058103}}))
    },
  ),
  rest.get(
    `http://api.exchangeratesapi.io/v1/${format(subDays(toDay, 6), 'yyyy-MM-dd')}?access_key=${key}&symbols=XRP&format=1`,
    async (req, res, ctx) => {
      return res(ctx.json({rates: {XRP: 5.058103}}))
    },
  ),
]

export {handlers}