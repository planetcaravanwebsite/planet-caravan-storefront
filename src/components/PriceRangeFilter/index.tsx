import "./scss/index.scss";

import * as React from "react";

import "rsuite/dist/styles/rsuite-default.css";
import { RangeSlider } from "rsuite";
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
  oldFrom: number;
  oldTo: number;
  maxVal: number;
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
    oldFrom: null,
    oldTo: null,
    maxVal: null,
  };

  StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
  `;

  StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
  `;

  StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props =>
      // @ts-ignore
      props.index === 2 ? "#f00" : props.index === 1 ? "#0f0" : "#ddd"};
    border-radius: 999px;
  `;

  constructor(props) {
    super(props);
    // this.state.newFrom = this.props.from;
    // this.state.newTo = this.props.to;
    this.state.maxVal = this.props.max || 200;
    console.log(this.state.maxVal);
    this.changeValueandTrigger = debounce(
      this.changeValueandTrigger.bind(this),
      500
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
    if (this.compareStates(this.state.oldFrom, val[0])) {
      console.log("changing from");
      console.log("new state: %o", val[0]);
      console.log("old to: %o", parseInt(String(this.props.to), 10));
      if (val[0] > parseInt(String(this.props.to), 10)) {
        console.log("not changing");
        return;
      }
      console.log("changing default");
      const e = new Event("input", { bubbles: true });
      const input = document.querySelector("#fromInput");
      this.setNativeValue(input, val[0]);
      input.dispatchEvent(e);
      this.setState({ oldFrom: val[0] });
    } else if (this.compareStates(this.state.oldTo, val[1])) {
      console.log("changing to");
      const e = new Event("input", { bubbles: true });
      const input = document.querySelector("#toInput");
      this.setNativeValue(input, val[1]);
      input.dispatchEvent(e);
      this.setState({ oldTo: val[1] });
    }
  }

  render() {
    const { from, onChange, to } = this.props;

    return (
      <div
        className="price-filter"
        ref={this.filterRef}
        onClick={this.handleClick}
      >
        <p className="p_heading">Price Filter</p>

        <this.StyledSlider
          // @ts-ignore
          defaultValue={[0, this.state.maxVal]}
          max={this.state.maxVal}
          onChange={(value, index) => {
            console.log(value);
            this.changeValueandTrigger(value);
          }}
          renderTrack={this.Track}
          renderThumb={this.Thumb}
        />

        <RangeSlider
          progress
          barClassName="styledSlider"
          style={{ marginTop: 16 }}
          defaultValue={[from, to]}
          max={this.state.maxVal}
          onChange={value => {
            // console.log(value);
            this.changeValueandTrigger(value);
          }}
        />

        <TextField
          id="fromInput"
          type="number"
          placeholder="From"
          onChange={event => {
            // @ts-ignore
            if (parseInt(event.target.value, 10) > parseInt(to, 10)) {
              onChange("priceGte", event.target.value as any);
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
