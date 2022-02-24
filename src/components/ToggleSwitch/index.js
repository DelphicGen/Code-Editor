import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../features/theme/themeSlice';
import styled from 'styled-components';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/storage';

const ToggleSwitchContainer = styled.label`
  border: 3px solid #FFF;
  border-radius: 34px;
  position: relative;
  display: inline-block;
  width: 52px;
  height: 24px;
`;

const ToggleSwitchSlider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${prop => prop.theme.colors.tertiary};
  transition-duration: .4s;
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    top: 4px;
    left: 4px;
    background-color: #FFF;
    transition-duration: .4s;
  }
`;

const ToggleSwitchSliderRound = styled(ToggleSwitchSlider)`
  border-radius: 34px;
  &:before {
    border-radius: 50%;
  }
`;

const MoonIcon = styled.span`
  opacity: 0;
  height: 12px;
  width: 12px;
  box-shadow: -4px 0 0 0 #FFF;
  border-radius: 50%;
  margin-left: 12px;
`;

const SunIcon = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #F6B932;
  margin-right: 8px;
`;

const ToggleSwitchInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + ${ToggleSwitchSlider} {
    &:before {
      transform: translateX(28px);
    }
    & > ${MoonIcon} {
      opacity: 1;
    }
    & > ${SunIcon} {
      opacity: 0;
    }
  }
`;

const ToggleSwitch = () => {
  const allThemes = getFromLocalStorage('all-themes');
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    setToLocalStorage('theme', theme);
  }, [theme])

  const triggerChangeTheme = () => {
    let nextTheme = theme.id === 'T_001' ? allThemes.data.dark : allThemes.data.light;
    dispatch(changeTheme(nextTheme))
  }

  return (
    <ToggleSwitchContainer>
      <ToggleSwitchInput defaultChecked={theme.id === 'T_002'} onChange={triggerChangeTheme} />
      <ToggleSwitchSliderRound>
        <MoonIcon />
        <SunIcon />
      </ToggleSwitchSliderRound>
    </ToggleSwitchContainer>
  )
}

export default ToggleSwitch
