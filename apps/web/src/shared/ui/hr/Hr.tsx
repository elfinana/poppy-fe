/**@param variant heavy = 16px, bold = 8px, regular = 4px, light = 2px, hairline = 1px */

type Props = {
  variant: 'heavy' | 'bold' | 'regular' | 'light' | 'hairline';
  className?: string;
};

/**@description heavy = 16px | bold = 8px | regular = 4px | light = 2px | hairline = 1px
 */
export const Hr = (props: Props) => {
  switch (props.variant) {
    case 'heavy':
      return <hr className={`border-8 border-gray-50 ${props.className}`} />;
    case 'bold':
      return <hr className={`border-4 border-gray-50 ${props.className}`} />;
    case 'regular':
      return <hr className={`border-2 border-gray-50 ${props.className}`} />;
    case 'light':
      return <hr className={`border-1 border-gray-50 ${props.className}`} />;
    case 'hairline':
      return <hr className={`border-.5 border-gray-50 ${props.className}`} />;
  }
};
