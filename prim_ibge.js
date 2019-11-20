import Graph from '../../../data-structures/graph/Graph';
import PriorityQueue from '../../../data-structures/priority-queue/PriorityQueue';

/**
 * @param {Graph} graph
 * @return {Graph}
 */
export default function prim(graph) {
  if (graph.isDirected) {
    throw new Error('Esse grafico nao funciona!');
  }

  const minimumSpanningTree = new Graph();


  const edgesQueue = new PriorityQueue();

  const visitedVertices = {};

  const startVertex = graph.getAllVertices()[0];

  visitedVertices[startVertex.getKey()] = startVertex;

  startVertex.getEdges().forEach((graphEdge) => {
    edgesQueue.add(graphEdge, graphEdge.weight);
  });

  while (!edgesQueue.isEmpty()) {
    /** @var {GraphEdge} currentEdge */
    const currentMinEdge = edgesQueue.poll();

    let nextMinVertex = null;
    if (!visitedVertices[currentMinEdge.startVertex.getKey()]) {
      nextMinVertex = currentMinEdge.startVertex;
    } else if (!visitedVertices[currentMinEdge.endVertex.getKey()]) {
      nextMinVertex = currentMinEdge.endVertex;
    }

    if (nextMinVertex) {
      minimumSpanningTree.addEdge(currentMinEdge);

      visitedVertices[nextMinVertex.getKey()] = nextMinVertex;

      nextMinVertex.getEdges().forEach((graphEdge) => {
        if (
          !visitedVertices[graphEdge.startVertex.getKey()]
          || !visitedVertices[graphEdge.endVertex.getKey()]
        ) {
          edgesQueue.add(graphEdge, graphEdge.weight);
        }
      });
    }
  }

  return minimumSpanningTree;
}