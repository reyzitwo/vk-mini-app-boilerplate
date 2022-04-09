import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Group, Cell, Switch, Spinner } from "@vkontakte/vkui";
import { Icon28MoonOutline } from "@vkontakte/icons";
import { set } from '../../reducers/mainReducer';

function ThemeControllers() {
  const theme = useSelector((state) => state.main.theme)
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1);
  }, []);

  return (
    <Group>
      <Cell
        before={<Icon28MoonOutline />}
        disabled
        after={
          loaded ? (
            <Switch
              onChange={() => dispatch(set({ key: 'theme', value: theme === 'dark' ? 'light' : 'dark' }))}
              aria-label="Тёмная тема"
            />
          ) : (
            <Spinner size="regular" />
          )
        }
      >
        Тёмная тема
      </Cell>
    </Group>
  );
};

export default ThemeControllers;