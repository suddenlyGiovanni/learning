package com.codingwithmosh;

import com.codingwithmosh.state.BrushTool;
import com.codingwithmosh.state.Canvas;
import com.codingwithmosh.state.EraserTool;
import com.codingwithmosh.state.SelectionTool;


public class Main {

    public static void main (String[] args) {
        var canvas = new Canvas();
        canvas.setCurrentTool(new EraserTool());
        canvas.mouseDown();
        canvas.mouseUp();

    }
}
