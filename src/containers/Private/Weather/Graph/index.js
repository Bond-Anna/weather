import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({ data, maxY, minY, colorA, colorB }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 10, bottom: 22, left: 10 }}
    xScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      // type: 'time',
      // format: '%Y-%m-%d',
      // useUTC: false,
      // precision: 'day',
    }}
    xFormat=" =-"
    yScale={{
      type: 'linear',
      min: minY,
      max: maxY + 5,
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="natural"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 0,
      tickPadding: 10,
      tickRotation: 0,
      tickValues: 6,
    }}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    defs={[
      {
        id: 'gradientC',
        type: 'linearGradient',
        colors: [
          { offset: 0, color: colorA },
          { offset: 100, color: colorB },
        ],
      },
    ]}
    fill={[{ match: '*', id: 'gradientC' }]}
    lineWidth={0}
    pointSize={2}
    pointColor={{ theme: 'background' }}
    pointBorderColor="black"
    enablePointLabel={true}
    pointLabel="y"
    pointLabelYOffset={-5}
    enableArea={true}
    areaOpacity={0.3}
    crosshairType="top-left"
    isInteractive={false}
  />
)
export default MyResponsiveLine
