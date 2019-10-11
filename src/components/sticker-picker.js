import React, { useEffect, useMemo, useState } from 'react'
import { animated, useTransition } from 'react-spring'
import { useWindowScroll } from 'react-use'

import styles from './sticker-picker.module.css'

import StickerOne from '../../static/sticker-1.svg'
import StickerTwo from '../../static/sticker-2.svg'
import StickerThree from '../../static/sticker-3.svg'
import StickerFour from '../../static/sticker-4.svg'
import StickerFive from '../../static/sticker-5.svg'
import StickerSix from '../../static/sticker-6.svg'
import StickerSeven from '../../static/sticker-7.svg'
import StickerEight from '../../static/sticker-8.svg'
import StickerNine from '../../static/sticker-9.svg'
import StickerTen from '../../static/sticker-10.svg'

import StickerButtonOne from '../../static/sticker-button-1.png'
import StickerButtonTwo from '../../static/sticker-button-2.png'
import StickerButtonThree from '../../static/sticker-button-3.png'
import StickerButtonFour from '../../static/sticker-button-4.png'
import StickerButtonFive from '../../static/sticker-button-5.png'

const images = [
  StickerOne,
  StickerTwo,
  StickerThree,
  StickerFour,
  StickerFive,
  StickerSix,
  StickerSeven,
  StickerEight,
  StickerNine,
  StickerTen,
]

const buttons = [
  StickerButtonOne,
  StickerButtonTwo,
  StickerButtonThree,
  StickerButtonFour,
  StickerButtonFive,
]

const getRandomPosition = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomButton = () => {
  return buttons[Math.floor(Math.random() * buttons.length)]
}

const button = getRandomButton()

const StickerPicker = () => {
    const [stickers, setStickers] = useState([])
    const [availableStickers, setAvailableStickers] = useState(images)

    const { y } = useWindowScroll()

    useEffect(() => {
      if(stickers.length > 0) {
        setAvailableStickers(images)
        setStickers([])
      }
    }, [y])

    const getRandomSticker = () => {
      return availableStickers[Math.floor(Math.random() * availableStickers.length)]
    }

    const stickerPosition = () => {
      let height = 0
      let width = 0

      if(window) {
        height = window.innerHeight
        width = window.innerWidth
      }

      const xMin = 0
      const xMax = width
      const yMin = y
      const yMax = height + y

      return {
        left: getRandomPosition(xMin, xMax),
        top: getRandomPosition(yMin, yMax),
      }
    }

    const addSticker = () => {
      let height = 0
      let width = 0

      if(window) {
        height = window.innerHeight
        width = window.innerWidth
      }

      const xMin = .1 * width
      const xMax = .9 * width
      const yMin = .1 * height + y
      const yMax = .9 * height + y

      const sticker = getRandomSticker()

      setStickers([...stickers,
        {
          src: sticker,
          style: {
            left: `${getRandomPosition(xMin, xMax)}px`,
            top: `${getRandomPosition(yMin, yMax)}px`,
          }
      }])

      setAvailableStickers(availableStickers.filter(s => s !== sticker))
    }

    const transitions = useTransition(stickers, sticker => sticker.src, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    })

    const showButton = useMemo(() => {
      if(!document) return false
      return y < .25 * document.body.scrollHeight || y === 0
    }, [y])

    const buttonTransition = useTransition(showButton, null, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    })

    return (
        <>
            { availableStickers.length > 0
              && buttonTransition.map(({ item, key, props }) => console.log('item', item) || item && (
                <animated.div key={key} className={styles.buttonWrapper} style={props}>
                  <img onClick={addSticker} className={styles.button} src={button} />
                </animated.div>
              ))
            }
            <div className={styles.wrapper}>
                { transitions.map(({ item, props, key }) =>
                  <animated.div key={key} className={styles.stickerWrapper} style={{...props, ...item.style}}>
                    <img src={item.src} className={styles.sticker} />
                  </animated.div>
                )}
            </div>
        </>
    )
}

export default StickerPicker;
