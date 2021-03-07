import Map from '.'

export default {
  title: 'Components/Map',
  component: Map,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'eplenario_primary_color'
    }
  }
}

export const Basic = (args) =>
  <div
    style={ {
      marginTop: 30,
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    } }
  >
    <Map {...args} />
  </div>
