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
    background: ${props =>
      // @ts-ignore
      props.index === 2 ? "#ddd" : props.index === 1 ? "#88ddff" : "#ddd"};
    border-radius: 999px;
  `;

  constructor(props) {
    super(props);
    // this.state.newFrom = this.props.from;
    // this.state.newTo = this.props.to;
    this.state.maxVal = this.props.max || 1000;
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
    const e = new Event("input", { bubbles: true });
    const inputFrom = document.querySelector("#fromInput");
    const inputTo = document.querySelector("#toInput");

    /* console.log(this.state.oldFrom);
    console.log(val[0]);

    console.log(this.compareStates(this.state.oldFrom, val[0]));

    console.log(this.state.oldTo);
    console.log(val[1]);

    console.log(this.compareStates(this.state.oldTo, val[1])); */

    if (!this.state.oldTo && val[1] < this.state.maxVal) {
      console.log("changing TO from default");
      this.setNativeValue(inputTo, val[1]);
      inputTo.dispatchEvent(e);
      this.setState({ oldTo: val[1] });
    } else if (!this.state.oldFrom && val[0] > 0) {
      console.log("changing FROM from default");
      this.setNativeValue(inputFrom, val[0]);
      inputFrom.dispatchEvent(e);
      this.setState({ oldFrom: val[0] });
    } else if (this.compareStates(this.state.oldFrom, val[0])) {
      console.log("changing from");
      /* if (val[0] > parseInt(String(this.props.to), 10)) {
        console.log("not changing");
        return;
      } */
      this.setNativeValue(inputFrom, val[0]);
      inputFrom.dispatchEvent(e);
      this.setState({ oldFrom: val[0] });
    } else if (this.compareStates(this.state.oldTo, val[1])) {
      console.log("changing to");
      this.setNativeValue(inputTo, val[1]);
      inputTo.dispatchEvent(e);
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
