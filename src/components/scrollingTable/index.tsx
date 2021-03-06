import * as React from 'react'

import styles from './styles.module.css'

type Props = {
  keyCol: string,
  colorCol?: string,
  columns: Array<{
    name: string,
    field: string,
    width?: string
  }>,
  data: Array<object>,
  width: string,
  height: string
}

type State = {
  tooTall: boolean
}

export default class ScrollingTable extends React.Component<Props, State> {
  private readonly tableRef: React.RefObject<HTMLDivElement>;

  constructor(props : Props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {tooTall: false}
  }

  componentDidMount() {
    this.updateTooTall()
  }

  componentDidUpdate(prevProps : Props) {
    if (prevProps.data !== this.props.data) {
      this.updateTooTall()
    }
  }

  updateTooTall() {
    const el = this.tableRef.current!;
    this.setState({tooTall: el.scrollHeight > el.clientHeight})
  }

  calcSpeed() {
    const el = this.tableRef.current!;

    return el.scrollHeight / document.documentElement.clientHeight * 30 // Want constant ips (e.g rate * length)
  }

  renderHeading () {
    return <thead>
      <tr>
        {this.props.columns.map((col) => <th style={{width: col.width}} key={col.field}>{col.name}</th>)}
      </tr>
    </thead>
  }

  renderRow (data : object, key : string) {
    return <tr key={key} style={{background: this.props.colorCol && data[this.props.colorCol] ? data[this.props.colorCol][0] : null, color: this.props.colorCol && data[this.props.colorCol] ? data[this.props.colorCol][1] : null}}>
      {this.props.columns.map((col) => <td style={{width: col.width}} key={col.field}>{data[col.field]}</td>)}
    </tr>
  }

  renderBody (copies : number) {
    const indexes = [...Array(copies).keys()];
    return <tbody>
      {indexes.map((idx) => {
        const rows = this.props.data.map((row) => this.renderRow(row, row[this.props.keyCol] + '-' + idx));
        if (copies > 1) {
          rows.push(<tr key={'sep-' + idx} className={styles.separator}>
            <td colSpan={this.props.columns.length} />
          </tr>)
        }
        return rows
      })}
    </tbody>
  }

  renderSpecialHeading() {
    return <div style={{height: '2em', overflow: 'hidden', position: 'absolute', zIndex: 5, borderColor: '#232323', borderBottomStyle: 'solid', borderWidth: '0.25vmin'}}>
      <table style={{width: this.props.width}}>
        {this.renderHeading()}
        {this.renderBody(1)}
      </table>
    </div>
  }

  render() {
    const {
      width,
      height
    } = this.props;

    const normalTable = <div className={styles.tableWrapper} style={{minWidth: width, height: height}} ref={this.tableRef}>
      <table style={{width: this.props.width}}>
        {this.renderHeading()}
        {this.renderBody(1)}
      </table>
    </div>;

    return this.state.tooTall
      ? <div style={{minWidth: width, height: height}} className={styles.wrapperDiv + ' ' + styles.tableWrapper}>
        {this.renderSpecialHeading()}
        <div style={{animation: `${styles.tableScroll} ${this.calcSpeed()}s linear infinite`}}>
          <table style={{width: width}}>
            {this.renderHeading()}
            {this.renderBody(2)}
            {this.renderHeading()}
          </table>
        </div>
        {normalTable}
      </div>
      : normalTable
  }
}
