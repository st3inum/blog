#include <bits/stdc++.h>
using namespace std;

const int LG = 29, INF = 1e9;

vector<int> a;

struct Trie {
	vector<array<int, 2>> nxt;

	Trie() { nxt.push_back({}); }

	void add(int x, int bit) {
		int u = 0;
		for (int i = bit; i >= 0; i--) {
			int c = x >> i & 1;
			if (!nxt[u][c]) nxt[u][c] = nxt.size(), nxt.push_back({});
			u = nxt[u][c];
		}
	}

	int get(int x, int bit) {
		int u = 0, ans = 0;
		for (int i = bit; i >= 0; i--) {
			int c = x >> i & 1;
			if (nxt[u][c]) u = nxt[u][c];
			else ans += 1 << i, u = nxt[u][c ^ 1];
		}
		return ans;
	}
};

int best(int l1, int r1, int l2, int r2, int bit) {
	if (bit < 0) return 0;
	if (r1 - l1 > r2 - l2) {
		swap(l1, l2);
		swap(r1, r2);
	}

	Trie trie;
	for (int i = l1; i < r1; i++) trie.add(a[i], bit);

	int ans = INF;
	for (int i = l2; i < r2; i++) ans = min(ans, trie.get(a[i], bit));
	return ans;
}

long long solve(int l, int r, int bit) {
	if (r - l <= 1 || bit < 0) return 0;

	int m = l;
	while (m < r && !(a[m] >> bit & 1)) m++;

	long long ans = solve(l, m, bit - 1) + solve(m, r, bit - 1);
	if (l < m && m < r) ans += (1LL << bit) + best(l, m, m, r, bit - 1);
	return ans;
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int n; cin >> n;
	a.resize(n);
	for (int i = 0; i < n; i++) cin >> a[i];

	sort(a.begin(), a.end());
	cout << solve(0, n, LG) << '\n';
}
