import "./scss/index.scss";

import * as React from "react";

import ReactSlider from "react-slider";
import { debounce } from "lodash";
import styled from "styled-components";
import { TextField } from "..";

interface PriceRangeFilterProps {
  from: number;
  to: number;
  onChange: (field: "priceLte" | "priceGte", value: number) => void;
  max: number;
}

interface PriceRangeFilterState {
  active: boolean;
  newFrom: number;
  newTo: number;
  maxVal: number;
  myFrom: number;
  myTo: number;
}

class PriceRangeFilter extends React.Component<
  PriceRangeFilterProps,
  PriceRangeFilterState
> {
  filterRef = React.createRef<HTMLDivElement>();

  state: PriceRangeFilterState = {
    active: false,
    newFrom: null,
    newTo: null,
    maxVal: null,
    myFrom: null,
    myTo: null,
  };

  StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
    margin-bottom: 14px;
  `;

  StyledThumb = styled.div`
    top: -5px;
    height: 35px;
    line-height: 35px;
    width: 35px;
    font-size: 13px;
    text-align: center;
    background-color: #002646;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
    &:focus {
      outline: none;
    }
  `;

  StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: #ddd;
    border-radius: 999px;
  `;

  constructor(props) {
    super(props);

    let maxVal = this.props.max;
    if (maxVal < 200) {
      maxVal = 200;
    }
    this.state.maxVal = maxVal || 1000;

    const from = this.props.from || 0;
    this.state.myFrom = from;

    const to = this.props.to || 10000;
    this.state.myTo = to;

    // console.log(this.state.maxVal);
    this.changeValueandTrigger = debounce(
      this.changeValueandTrigger.bind(this),
      250
    );
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickAway);
  }

  // eslint-disable-next-line class-methods-use-this
  setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  }

  Thumb = (props, state) => (
    <this.StyledThumb {...props}>{state.valueNow}</this.StyledThumb>
  );

  Track = (props, state) => <this.StyledTrack {...props} index={state.index} />;

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ active: true });
    event.stopPropagation();
  };

  handleClickAway = (event: Event) => {
    if (
      this.state.active &&
      !this.filterRef.current.contains(event.target as Node)
    ) {
      this.setState({ active: false });
    }
  };

  createLabel() {
    const { from, to } = this.props;
    if (!!from && !!to) {
      return `${from} - ${to}`;
    }
    if (from) {
      return `from ${from}`;
    }
    if (to) {
      return `to ${to}`;
    }
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  compareStates(oldVal, newVal) {
    return oldVal !== newVal;
  }

  changeValueandTrigger(val) {
    const e = new Event("input", { bubbles: true });
    const inputFrom = document.querySelector("#fromInput");
    const inputTo = document.querySelector("#toInput");

    const low = val[0] < val[1] ? val[0] : val[1];
    let high = val[0] > val[1] ? val[0] : val[1];

    if (high > this.state.maxVal) high = this.state.maxVal;

    this.setNativeValue(inputFrom, low);
    inputFrom.dispatchEvent(e);

    this.setNativeValue(inputTo, high);
    inputTo.dispatchEvent(e);

    this.setState({
      myFrom: low,
      myTo: high,
    });
  }

  render() {
    const { from, onChange, to } = this.props;
    const range = [
      parseInt(String(this.state.myFrom), 10),
      parseInt(String(this.state.myTo), 10),
    ];

    return (
      <div
        className="price-filter"
        ref={this.filterRef}
        onClick={this.handleClick}
      >
        <p className="p_heading">Price Filter</p>

        <this.StyledSlider
          // @ts-ignore
          defaultValue={range}
          max={this.state.maxVal}
          onChange={(value, index) => {
            // console.log(value);
            this.changeValueandTrigger(value);
          }}
          renderTrack={this.Track}
          renderThumb={this.Thumb}
        />

        <TextField
          id="fromInput"
          type="number"
          placeholder="From"
          onChange={event => {
            // @ts-ignore
            if (parseInt(event.target.value, 10) > parseInt(to, 10)) {
              // onChange("priceGte", event.target.value as any);
              return;
            }
            onChange("priceGte", event.target.value as any);
          }}
          value={this.state.newFrom}
        />
        <TextField
          id="toInput"
          type="number"
          placeholder="To"
          onChange={event => {
            // @ts-ignore
            if (parseInt(from, 10) > parseInt(event.target.value, 10)) {
              // onChange("priceGte", event.target.value as any);
              return;
            }
            onChange("priceLte", event.target.value as any);
          }}
          value={this.state.newTo}
        />
      </div>
    );
  }
}

export default PriceRangeFilter;
