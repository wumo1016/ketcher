/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/
import { type IconName } from 'ketcher-react';
import { useMenuContext } from '../../../hooks/useMenuContext';
import { useCallback } from 'react';
import { StyledIconButton } from './styles';

type MenuItemProp = {
  itemId: IconName;
  title?: string;
  testId?: string;
};

const MenuItem = ({ itemId, title = '', testId }: MenuItemProp) => {
  const { isActive, activate } = useMenuContext();

  const onClickCallback = useCallback(() => {
    activate(itemId);
  }, [activate, itemId]);

  const isActiveItem = isActive(itemId);
  const activeClass = isActiveItem ? ' active' : '';

  return (
    <StyledIconButton
      title={title}
      className={itemId + activeClass}
      isActive={isActiveItem}
      onClick={onClickCallback}
      iconName={itemId}
      testId={testId}
    />
  );
};

export { MenuItem };
